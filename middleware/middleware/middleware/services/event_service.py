import json
import threading
import time
from collections import defaultdict, deque


class EventService:

    def __init__(self):
        self._events = defaultdict(
            deque
        )

        self._conditions = defaultdict(
            threading.Condition
        )

        self._lock = threading.Lock()

    def publish(
        self,
        request_id,
        event,
        data,
    ):
        payload = {
            "event": event,
            "data": data,
        }

        with self._lock:
            queue = self._events[
                request_id
            ]

            queue.append(payload)

            # Keep memory bounded.
            while len(queue) > 50:
                queue.popleft()

        condition = self._conditions[
            request_id
        ]

        with condition:
            condition.notify_all()

    def get_events(
        self,
        request_id,
    ):
        with self._lock:
            return list(
                self._events.get(
                    request_id,
                    [],
                )
            )

    def stream(
        self,
        request_id,
        timeout_seconds=30,
    ):
        sent_count = 0
        started = time.monotonic()

        while (
            time.monotonic() - started
            < timeout_seconds
        ):
            events = self.get_events(
                request_id
            )

            while sent_count < len(events):
                event = events[
                    sent_count
                ]

                sent_count += 1

                yield self._format_sse(
                    event["event"],
                    event["data"],
                )

            # If completed/failed already happened,
            # close the stream shortly afterward.
            if events:
                latest = events[-1]

                if latest["event"] in {
                    "completed",
                    "failed",
                }:
                    break

            condition = self._conditions[
                request_id
            ]

            with condition:
                condition.wait(
                    timeout=1
                )

            time.sleep(0.05)

    @staticmethod
    def _format_sse(
        event,
        data,
    ):
        return (
            f"event: {event}\n"
            f"data: {json.dumps(data, ensure_ascii=False)}\n\n"
        )