# roadDamage-detection-Ai
AI-powered road damage detection and analysis using YOLO and the RDD2022 dataset.
# Road Damage Detection AI

## Hackathon README — India + China Drone YOLO Models

## Overview

Road Damage Detection AI is a computer-vision project for detecting road damage from uploaded or captured road images.

The current system uses two YOLO26n models:

* One trained for the India portion of RDD2022
* One trained for China Drone data

The intended website workflow sends one image to the backend, runs the available models, processes their detections, and presents the results to the user.

## Key Features

* Image-based road-damage detection using YOLO26n
* India model with 10 damage classes
* China Drone model with 6 reported classes
* Designed for a web interface with upload/camera input
* Backend can run both models on the same image

## Technology Stack

* Python
* Ultralytics YOLO
* YOLO26n
* RDD2022
* HTML/CSS/JavaScript
* GitHub
* Google Colab

## Dataset

The India model uses the India portion of the RDD2022 road-damage dataset.

The project also includes a trained China Drone model supplied by the team.

**RDD2022 official dataset:**

https://figshare.com/articles/dataset/RDD2022_-_The_multi-national_Road_Damage_Dataset_released_through_CRDDC_2022/21431547

## India Model

**Model:** YOLO26n

**Training:** 30 epochs

**Validation images:** 1,542

**Validation instances:** 1,622

**mAP50:** 0.3739

**mAP50-95:** 0.1646

**Precision:** 0.3774

**Recall:** 0.4489

### India Classes

* D00
* D01
* D0w0
* D10
* D11
* D20
* D40
* D43
* D44
* D50

## China Drone Model

**Model:** YOLO26n

**Training:** 30 epochs

**Image size:** 640

**Batch size:** 4

**Reported validation images:** 480

**Reported Precision:** 0.580

**Reported Recall:** 0.475

**Reported mAP50:** 0.543

**Reported mAP50-95:** 0.335

### China Classes

* Block crack
* D00
* D10
* D20
* D40
* Repair

## System Architecture

The intended system workflow is:

```text
User uploads or captures one road image
                ↓
Backend receives the image
                ↓
India YOLO model + China Drone YOLO model
                ↓
Backend processes detections
                ↓
Frontend displays the consolidated result
```

## Important Model Consideration

The two models were trained with different class vocabularies.

The backend should **not automatically assume that differently named classes are equivalent**.

Where detections overlap, consolidation/deduplication should only be performed when the class mapping is explicitly defined.

Confidence scores from separately trained models should also not be treated as directly comparable without calibration.

## Model Files

### India Model

```text
RDD2022_India_yolo26n_30epoch_best.pt
```

### China Model

```text
China_Drone_yolo26n_30epoch_best.pt
```

## Suggested Project Structure

```text
roadDamage-detection-Ai/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── scripts.jss
├── backend/
│   └── ... backend/API files
├── models/
│   ├── RDD2022_India_yolo26n_30epoch_best.pt
│   └── China_Drone_yolo26n_30epoch_best.pt
└── README.md
```

## Run the Frontend Locally

From the project directory:

```bash
python3 -m http.server 8000 --directory frontend
```

Then open the local server in a browser at port `8000`.

## Inference Example

```python
from ultralytics import YOLO

india_model = YOLO("models/RDD2022_India_yolo26n_30epoch_best.pt")
china_model = YOLO("models/China_Drone_yolo26n_30epoch_best.pt")

india_results = india_model.predict(
    source=image_path,
    imgsz=640,
    conf=0.25
)

china_results = china_model.predict(
    source=image_path,
    imgsz=640,
    conf=0.25
)
```

## Training Data Preparation — India

The India dataset contained:

* 7,706 training images
* 7,706 XML annotations

XML annotations were converted to YOLO labels with no skipped files.

The resulting data was split into:

* 6,164 training images
* 1,542 validation images

All images were matched to their labels.

## Evaluation Note

The reported India metrics come from the labeled validation split.

The official RDD2022 test set is unlabeled, so inference on those images should be treated as demonstration/inference rather than as a ground-truth accuracy measurement.

## Future Improvements

* Obtain and standardize the China training dataset if a unified retrained model is desired.
* Define an explicit class mapping before merging model outputs.
* Add a labeled held-out test set for final evaluation.
* Improve small/underrepresented class performance with additional data and tuning.
* Add confidence visualization, damage counts, and location/severity information to the website.

## References

* RDD2022 — The multi-national Road Damage Dataset released through CRDDC 2022.
* Ultralytics YOLO documentation and model tooling.
