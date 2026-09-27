/* =========================================================
   ROADGUARD INDIA
   FRONTEND APPLICATION
========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

const API_BASE = "http://127.0.0.1:5000";

const API_PREDICT_URL = `${API_BASE}/predict`;
const API_HEALTH_URL = `${API_BASE}/health`;


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

    en: {

        /* Utility */
        utility_demo:
            "India-focused civic technology demonstration",

        language_label:
            "Language",

        /* Navigation */
        nav_home:
            "Home",

        nav_how:
            "How It Works",

        nav_detect:
            "Detect Damage",

        nav_about:
            "About",

        nav_support:
            "Support",

        header_phone:
            "Public-service demo",


        /* Hero */
        hero_eyebrow:
            "AI-powered road assessment",

        hero_title:
            "Smarter Roads. Safer India.",

        hero_description:
            "RoadGuard India uses computer vision to identify visible road damage from images and return structured detection results.",

        hero_primary:
            "Detect Road Damage",

        hero_secondary:
            "Learn How It Works",

        hero_note:
            "Student-built academic and research demonstration. Not an official Government of India service.",

        hero_status_title:
            "Detection workflow",

        status_ready:
            "Ready",

        workflow_upload:
            "Upload",

        workflow_upload_desc:
            "Road image",

        workflow_analyze:
            "Analyze",

        workflow_analyze_desc:
            "AI model",

        workflow_result:
            "Identify",

        workflow_result_desc:
            "Structured result",


        /* Trust */
        trust_ai:
            "AI-Powered Analysis",

        trust_ai_desc:
            "Computer vision detection",

        trust_classes:
            "Road Damage Classes",

        trust_classes_desc:
            "RDD2022-based categories",

        trust_confidence:
            "Confidence Score",

        trust_confidence_desc:
            "Model confidence",

        trust_results:
            "Structured Results",

        trust_results_desc:
            "Backend API response",


        /* Detection */
        detect_kicker:
            "ROAD DAMAGE DETECTION",

        detect_title:
            "Analyze a road image",

        detect_description:
            "Upload an image of a road and send it to the RoadGuard detection API.",

        upload_label:
            "INPUT",

        upload_title:
            "Upload road image",

        upload_drop_title:
            "Drag & drop your road image here",

        upload_drop_text:
            "or select an image from your device",

        upload_browse:
            "Browse Files",

        upload_format:
            "JPG, JPEG or PNG",

        upload_size:
            "Maximum 10 MB",

        preview_title:
            "Selected image",

        preview_remove:
            "Remove",

        analyze_button:
            "Analyze Road Damage",


        /* Results */
        result_label:
            "OUTPUT",

        result_title:
            "Analysis result",

        result_waiting:
            "Waiting for image",

        result_empty_title:
            "No analysis yet",

        result_empty_text:
            "Upload a road image to see detection results here.",

        loading_title:
            "Analyzing image",

        loading_text:
            "Sending image to the AI detection service...",

        summary_damage:
            "DETECTED DAMAGE",

        summary_confidence:
            "Confidence",

        detail_severity:
            "Severity",

        detail_location:
            "Location",

        detail_road:
            "Road information",

        detail_detections:
            "Detections",

        table_title:
            "Detected objects",

        table_caption:
            "Road damage detections returned by the AI model",

        table_class:
            "Class",

        table_confidence:
            "Confidence",

        table_severity:
            "Severity",

        table_bbox:
            "Bounding Box",

        annotated_title:
            "Annotated image",

        error_title:
            "Analysis could not be completed",

        error_retry:
            "Try Again",


        /* How it works */
        how_kicker:
            "HOW IT WORKS",

        how_title:
            "From road image to structured result",

        how_description:
            "The website provides a simple interface between the user and the road-damage detection model.",

        step1_title:
            "Capture",

        step1_text:
            "Select a clear road image from your device.",

        step2_title:
            "Analyze",

        step2_text:
            "The frontend sends the image to the Flask prediction API.",

        step3_title:
            "Identify",

        step3_text:
            "The AI model returns road-damage detections, confidence and bounding boxes.",


        /* About */
        about_kicker:
            "ABOUT ROADGUARD",

        about_title:
            "A practical civic-technology demonstration",

        about_text1:
            "RoadGuard India demonstrates how computer vision can be connected to a web interface for road damage analysis.",

        about_text2:
            "The application is designed as an academic and research demonstration using road-damage data and a YOLO-based detection workflow.",

        architecture_label:
            "SYSTEM FLOW",

        architecture_user:
            "User",

        architecture_frontend:
            "Frontend",

        architecture_backend:
            "Backend",

        architecture_model:
            "AI Model",


        /* Support */
        support_kicker:
            "SUPPORT",

        support_title:
            "Questions about the demonstration?",

        support_text:
            "Contact the project team for questions about the website, demonstration or implementation.",

        contact_email:
            "Email",

        contact_phone:
            "Phone",


        /* Resources */
        resources_kicker:
            "PUBLIC RESOURCES",

        resources_title:
            "Useful Indian civic resources",

        resources_text:
            "These links are provided as external resources and are not operated by RoadGuard India.",

        resource_cpgrams:
            "Centralized Public Grievance Redress and Monitoring System",

        resource_mygov:
            "Citizen participation and government information",

        resource_morth:
            "Ministry of Road Transport and Highways",


        /* Footer */
        footer_description:
            "AI-assisted road damage detection for an academic and research demonstration.",

        footer_disclaimer:
            "RoadGuard India is a student-built academic/research demonstration and is not an official Government of India service."
    },


    hi: {

        /* Utility */
        utility_demo:
            "भारत-केंद्रित नागरिक प्रौद्योगिकी प्रदर्शन",

        language_label:
            "भाषा",


        /* Navigation */
        nav_home:
            "होम",

        nav_how:
            "यह कैसे काम करता है",

        nav_detect:
            "क्षति का पता लगाएँ",

        nav_about:
            "हमारे बारे में",

        nav_support:
            "सहायता",

        header_phone:
            "सार्वजनिक सेवा प्रदर्शन",


        /* Hero */
        hero_eyebrow:
            "AI आधारित सड़क मूल्यांकन",

        hero_title:
            "बेहतर सड़कें। सुरक्षित भारत।",

        hero_description:
            "RoadGuard India कंप्यूटर विज़न का उपयोग करके तस्वीरों में दिखाई देने वाली सड़क क्षति की पहचान करता है और संरचित परिणाम प्रदान करता है।",

        hero_primary:
            "सड़क क्षति का पता लगाएँ",

        hero_secondary:
            "यह कैसे काम करता है",

        hero_note:
            "छात्रों द्वारा बनाया गया शैक्षणिक और शोध प्रदर्शन। यह भारत सरकार की आधिकारिक सेवा नहीं है।",

        hero_status_title:
            "पहचान प्रक्रिया",

        status_ready:
            "तैयार",

        workflow_upload:
            "अपलोड",

        workflow_upload_desc:
            "सड़क की तस्वीर",

        workflow_analyze:
            "विश्लेषण",

        workflow_analyze_desc:
            "AI मॉडल",

        workflow_result:
            "पहचान",

        workflow_result_desc:
            "संरचित परिणाम",


        /* Trust */
        trust_ai:
            "AI आधारित विश्लेषण",

        trust_ai_desc:
            "कंप्यूटर विज़न पहचान",

        trust_classes:
            "सड़क क्षति श्रेणियाँ",

        trust_classes_desc:
            "RDD2022 आधारित श्रेणियाँ",

        trust_confidence:
            "विश्वास स्कोर",

        trust_confidence_desc:
            "मॉडल का विश्वास स्तर",

        trust_results:
            "संरचित परिणाम",

        trust_results_desc:
            "Backend API परिणाम",


        /* Detection */
        detect_kicker:
            "सड़क क्षति पहचान",

        detect_title:
            "सड़क की तस्वीर का विश्लेषण करें",

        detect_description:
            "सड़क की तस्वीर अपलोड करें और उसे RoadGuard की पहचान API पर भेजें।",

        upload_label:
            "इनपुट",

        upload_title:
            "सड़क की तस्वीर अपलोड करें",

        upload_drop_title:
            "अपनी सड़क की तस्वीर यहाँ खींचकर छोड़ें",

        upload_drop_text:
            "या अपने डिवाइस से तस्वीर चुनें",

        upload_browse:
            "फ़ाइल चुनें",

        upload_format:
            "JPG, JPEG या PNG",

        upload_size:
            "अधिकतम 10 MB",

        preview_title:
            "चयनित तस्वीर",

        preview_remove:
            "हटाएँ",

        analyze_button:
            "सड़क क्षति का विश्लेषण करें",


        /* Results */
        result_label:
            "आउटपुट",

        result_title:
            "विश्लेषण परिणाम",

        result_waiting:
            "तस्वीर की प्रतीक्षा",

        result_empty_title:
            "अभी कोई विश्लेषण नहीं",

        result_empty_text:
            "परिणाम देखने के लिए सड़क की तस्वीर अपलोड करें।",

        loading_title:
            "तस्वीर का विश्लेषण हो रहा है",

        loading_text:
            "तस्वीर को AI पहचान सेवा पर भेजा जा रहा है...",

        summary_damage:
            "पहचानी गई क्षति",

        summary_confidence:
            "विश्वास स्तर",

        detail_severity:
            "गंभीरता",

        detail_location:
            "स्थान",

        detail_road:
            "सड़क की जानकारी",

        detail_detections:
            "पहचान",

        table_title:
            "पहचानी गई वस्तुएँ",

        table_caption:
            "AI मॉडल द्वारा लौटाई गई सड़क क्षति पहचान",

        table_class:
            "श्रेणी",

        table_confidence:
            "विश्वास",

        table_severity:
            "गंभीरता",

        table_bbox:
            "Bounding Box",

        annotated_title:
            "चिह्नित तस्वीर",

        error_title:
            "विश्लेषण पूरा नहीं हो सका",

        error_retry:
            "दोबारा प्रयास करें",


        /* How it works */
        how_kicker:
            "यह कैसे काम करता है",

        how_title:
            "सड़क की तस्वीर से संरचित परिणाम तक",

        how_description:
            "वेबसाइट उपयोगकर्ता और सड़क क्षति पहचान मॉडल के बीच एक सरल इंटरफ़ेस प्रदान करती है।",

        step1_title:
            "तस्वीर लें",

        step1_text:
            "अपने डिवाइस से सड़क की स्पष्ट तस्वीर चुनें।",

        step2_title:
            "विश्लेषण करें",

        step2_text:
            "Frontend तस्वीर को Flask prediction API पर भेजता है।",

        step3_title:
            "पहचान करें",

        step3_text:
            "AI मॉडल सड़क क्षति, विश्वास स्तर और Bounding Box की जानकारी लौटाता है।",


        /* About */
        about_kicker:
            "ROADGUARD के बारे में",

        about_title:
            "एक व्यावहारिक नागरिक-प्रौद्योगिकी प्रदर्शन",

        about_text1:
            "RoadGuard India दिखाता है कि सड़क क्षति विश्लेषण के लिए कंप्यूटर विज़न को वेब इंटरफ़ेस से कैसे जोड़ा जा सकता है।",

        about_text2:
            "यह एप्लिकेशन सड़क क्षति डेटा और YOLO आधारित पहचान प्रक्रिया का उपयोग करने वाला शैक्षणिक और शोध प्रदर्शन है।",

        architecture_label:
            "सिस्टम प्रक्रिया",

        architecture_user:
            "उपयोगकर्ता",

        architecture_frontend:
            "Frontend",

        architecture_backend:
            "Backend",

        architecture_model:
            "AI मॉडल",


        /* Support */
        support_kicker:
            "सहायता",

        support_title:
            "प्रदर्शन के बारे में कोई प्रश्न है?",

        support_text:
            "वेबसाइट, प्रदर्शन या कार्यान्वयन से संबंधित प्रश्नों के लिए प्रोजेक्ट टीम से संपर्क करें।",

        contact_email:
            "ईमेल",

        contact_phone:
            "फ़ोन",


        /* Resources */
        resources_kicker:
            "सार्वजनिक संसाधन",

        resources_title:
            "भारत के उपयोगी नागरिक संसाधन",

        resources_text:
            "ये लिंक बाहरी संसाधनों के रूप में दिए गए हैं और RoadGuard India द्वारा संचालित नहीं हैं।",

        resource_cpgrams:
            "केंद्रीकृत सार्वजनिक शिकायत निवारण और निगरानी प्रणाली",

        resource_mygov:
            "नागरिक भागीदारी और सरकारी जानकारी",

        resource_morth:
            "सड़क परिवहन और राजमार्ग मंत्रालय",


        /* Footer */
        footer_description:
            "शैक्षणिक और शोध प्रदर्शन के लिए AI-सहायित सड़क क्षति पहचान।",

        footer_disclaimer:
            "RoadGuard India छात्रों द्वारा बनाया गया शैक्षणिक/शोध प्रदर्शन है और यह भारत सरकार की आधिकारिक सेवा नहीं है।"
    }

};


/* =========================================================
   DAMAGE CLASS TRANSLATIONS
========================================================= */

const damageTranslations = {

    en: {
        D00: "Longitudinal Crack",
        D01: "Transverse Crack",
        D0w0: "Alligator Crack",
        D10: "Longitudinal Crack",
        D11: "Transverse Crack",
        D20: "Alligator Crack",
        D40: "Pothole",
        D43: "Crosswalk Blur",
        D44: "White Line Blur",
        D50: "Other Damage",

        Pothole: "Pothole",
        pothole: "Pothole"
    },

    hi: {
        D00: "लंबवत दरार",
        D01: "आड़ी दरार",
        D0w0: "जालीनुमा दरार",
        D10: "लंबवत दरार",
        D11: "आड़ी दरार",
        D20: "जालीनुमा दरार",
        D40: "गड्ढा",
        D43: "क्रॉसवॉक धुंधलापन",
        D44: "सफेद रेखा धुंधलापन",
        D50: "अन्य क्षति",

        Pothole: "गड्ढा",
        pothole: "गड्ढा"
    }

};


/* =========================================================
   GLOBAL STATE
========================================================= */

let currentLanguage = "en";

let selectedFile = null;

let currentFontScale = 1;


/* =========================================================
   DOM REFERENCES
========================================================= */

const languageSelect =
    document.getElementById("language-select");

const imageInput =
    document.getElementById("image-input");

const browseButton =
    document.getElementById("browse-button");

const dropzone =
    document.getElementById("dropzone");

const previewArea =
    document.getElementById("preview-area");

const previewImage =
    document.getElementById("preview-image");

const fileName =
    document.getElementById("file-name");

const fileSize =
    document.getElementById("file-size");

const removeImageButton =
    document.getElementById("remove-image");

const analyzeButton =
    document.getElementById("analyze-button");

const resultEmpty =
    document.getElementById("result-empty");

const resultLoading =
    document.getElementById("result-loading");

const resultContent =
    document.getElementById("result-content");

const resultError =
    document.getElementById("result-error");

const resultState =
    document.getElementById("result-state");

const errorMessage =
    document.getElementById("error-message");

const retryButton =
    document.getElementById("retry-button");

const apiStatusText =
    document.getElementById("api-status-text");

const apiDot =
    document.getElementById("api-dot");

const mobileMenuButton =
    document.getElementById("mobile-menu-button");

const mainNav =
    document.getElementById("main-nav");

const screenReaderStatus =
    document.getElementById("screen-reader-status");


/* =========================================================
   LANGUAGE FUNCTIONS
========================================================= */

function translatePage(language) {

    if (!translations[language]) {
        language = "en";
    }

    currentLanguage = language;

    /*
     * Find every HTML element that contains
     * data-i18n="some_key"
     */
    const elements =
        document.querySelectorAll("[data-i18n]");

    elements.forEach((element) => {

        const key =
            element.getAttribute("data-i18n");

        const translatedText =
            translations[language][key];

        if (translatedText !== undefined) {
            element.textContent = translatedText;
        }

    });


    /*
     * Change HTML language attribute.
     *
     * This is important for screen readers.
     */
    document.documentElement.lang = language;


    /*
     * Change browser-visible document title.
     */
    if (language === "hi") {

        document.title =
            "RoadGuard India | बेहतर सड़कें। सुरक्षित भारत।";

    } else {

        document.title =
            "RoadGuard India | Smarter Roads. Safer India.";

    }


    /*
     * Keep selector synchronized.
     */
    if (languageSelect) {
        languageSelect.value = language;
    }


    /*
     * Save language.
     */
    localStorage.setItem(
        "roadguard-language",
        language
    );


    /*
     * Accessibility announcement.
     */
    announce(
        language === "hi"
            ? "वेबसाइट की भाषा हिंदी में बदल गई है।"
            : "Website language changed to English."
    );


    /*
     * Re-render dynamic API content if it exists.
     */
    refreshDynamicResultLanguage();

}


/* =========================================================
   LOAD SAVED LANGUAGE
========================================================= */

function loadSavedLanguage() {

    const savedLanguage =
        localStorage.getItem(
            "roadguard-language"
        );


    if (
        savedLanguage === "en" ||
        savedLanguage === "hi"
    ) {

        translatePage(savedLanguage);

        return;
    }


    /*
     * Browser language detection.
     */
    const browserLanguage =
        navigator.language ||
        navigator.userLanguage ||
        "en";


    if (
        browserLanguage.toLowerCase().startsWith("hi")
    ) {

        translatePage("hi");

    } else {

        translatePage("en");

    }

}


/* =========================================================
   DYNAMIC TRANSLATION HELPERS
========================================================= */

function translateDamageClass(value) {

    if (!value) {
        return "—";
    }

    const dictionary =
        damageTranslations[currentLanguage];

    return dictionary[value] || value;
}


function translateSeverity(value) {

    if (!value) {
        return "—";
    }

    const normalized =
        String(value).toLowerCase();

    if (currentLanguage === "hi") {

        if (normalized === "low") {
            return "कम";
        }

        if (normalized === "medium") {
            return "मध्यम";
        }

        if (normalized === "high") {
            return "अधिक";
        }

        if (normalized === "critical") {
            return "गंभीर";
        }

    }

    return value;
}


function refreshDynamicResultLanguage() {

    /*
     * If no result exists, there is nothing
     * to translate dynamically.
     */
    if (
        !resultContent ||
        resultContent.classList.contains("hidden")
    ) {
        return;
    }

    /*
     * The result will be rebuilt using the
     * stored API response when available.
     */
    if (window.lastPredictionResponse) {

        renderPrediction(
            window.lastPredictionResponse
        );

    }

}


/* =========================================================
   ACCESSIBILITY ANNOUNCEMENT
========================================================= */

function announce(message) {

    if (!screenReaderStatus) {
        return;
    }

    screenReaderStatus.textContent = "";

    setTimeout(() => {

        screenReaderStatus.textContent =
            message;

    }, 50);

}


/* =========================================================
   FONT SIZE ACCESSIBILITY
========================================================= */

function applyFontScale(scale) {

    currentFontScale =
        Math.max(
            0.9,
            Math.min(1.2, scale)
        );

    document.documentElement.style.setProperty(
        "--body-size",
        `${16 * currentFontScale}px`
    );

    localStorage.setItem(
        "roadguard-font-scale",
        currentFontScale
    );

}


function loadFontScale() {

    const saved =
        Number(
            localStorage.getItem(
                "roadguard-font-scale"
            )
        );

    if (!Number.isNaN(saved) && saved > 0) {

        applyFontScale(saved);

    }

}


/* =========================================================
   LANGUAGE SELECT EVENT
========================================================= */

if (languageSelect) {

    languageSelect.addEventListener(
        "change",
        (event) => {

            const language =
                event.target.value;

            translatePage(language);

        }
    );

}


/* =========================================================
   FILE VALIDATION
========================================================= */

function validateFile(file) {

    if (!file) {
        return {
            valid: false,
            message:
                currentLanguage === "hi"
                    ? "कृपया एक तस्वीर चुनें।"
                    : "Please select an image."
        };
    }


    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png"
    ];


    if (!allowedTypes.includes(file.type)) {

        return {
            valid: false,
            message:
                currentLanguage === "hi"
                    ? "केवल JPG, JPEG या PNG तस्वीरें स्वीकार की जाती हैं।"
                    : "Only JPG, JPEG or PNG images are accepted."
        };

    }


    const maxSize =
        10 * 1024 * 1024;


    if (file.size > maxSize) {

        return {
            valid: false,
            message:
                currentLanguage === "hi"
                    ? "तस्वीर का आकार 10 MB से अधिक नहीं होना चाहिए।"
                    : "Image size must not exceed 10 MB."
        };

    }


    return {
        valid: true
    };

}


/* =========================================================
   FILE SIZE
========================================================= */

function formatFileSize(bytes) {

    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

}


/* =========================================================
   HANDLE FILE
========================================================= */

function handleFile(file) {

    const validation =
        validateFile(file);


    if (!validation.valid) {

        showError(
            validation.message
        );

        return;

    }


    selectedFile = file;


    const reader =
        new FileReader();


    reader.onload = function(event) {

        previewImage.src =
            event.target.result;

        previewImage.alt =
            currentLanguage === "hi"
                ? "चयनित सड़क की तस्वीर"
                : "Selected road image";

    };


    reader.readAsDataURL(file);


    fileName.textContent =
        file.name;

    fileSize.textContent =
        formatFileSize(file.size);


    previewArea.classList.remove(
        "hidden"
    );


    dropzone.classList.add(
        "hidden"
    );


    analyzeButton.disabled =
        false;


    hideAllResults();


    resultState.textContent =
        currentLanguage === "hi"
            ? "विश्लेषण के लिए तैयार"
            : "Ready for analysis";


    announce(
        currentLanguage === "hi"
            ? "तस्वीर चुनी गई है। विश्लेषण शुरू करने के लिए बटन दबाएँ।"
            : "Image selected. Press the analyze button to begin."
    );

}


/* =========================================================
   FILE INPUT
========================================================= */

if (browseButton) {

    browseButton.addEventListener(
        "click",
        () => {

            imageInput.click();

        }
    );

}


if (imageInput) {

    imageInput.addEventListener(
        "change",
        (event) => {

            const file =
                event.target.files[0];

            if (file) {
                handleFile(file);
            }

        }
    );

}


/* =========================================================
   DRAG & DROP
========================================================= */

if (dropzone) {

    dropzone.addEventListener(
        "dragover",
        (event) => {

            event.preventDefault();

            dropzone.classList.add(
                "dragover"
            );

        }
    );


    dropzone.addEventListener(
        "dragleave",
        () => {

            dropzone.classList.remove(
                "dragover"
            );

        }
    );


    dropzone.addEventListener(
        "drop",
        (event) => {

            event.preventDefault();

            dropzone.classList.remove(
                "dragover"
            );


            const file =
                event.dataTransfer.files[0];


            if (file) {
                handleFile(file);
            }

        }
    );


    dropzone.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                imageInput.click();

            }

        }
    );

}


/* =========================================================
   REMOVE IMAGE
========================================================= */

if (removeImageButton) {

    removeImageButton.addEventListener(
        "click",
        resetUpload
    );

}


function resetUpload() {

    selectedFile = null;

    imageInput.value = "";

    previewImage.src = "";

    fileName.textContent = "—";

    fileSize.textContent = "—";

    previewArea.classList.add(
        "hidden"
    );

    dropzone.classList.remove(
        "hidden"
    );

    analyzeButton.disabled =
        true;

    hideAllResults();

    resultEmpty.classList.remove(
        "hidden"
    );

    resultState.textContent =
        translations[currentLanguage]
            .result_waiting;

}


/* =========================================================
   RESULT VISIBILITY
========================================================= */

function hideAllResults() {

    resultEmpty.classList.add(
        "hidden"
    );

    resultLoading.classList.add(
        "hidden"
    );

    resultContent.classList.add(
        "hidden"
    );

    resultError.classList.add(
        "hidden"
    );

}


/* =========================================================
   SHOW ERROR
========================================================= */

function showError(message) {

    hideAllResults();

    resultError.classList.remove(
        "hidden"
    );

    errorMessage.textContent =
        message;

    resultState.textContent =
        currentLanguage === "hi"
            ? "त्रुटि"
            : "Error";

    announce(message);

}


/* =========================================================
   ANALYZE BUTTON
========================================================= */

if (analyzeButton) {

    analyzeButton.addEventListener(
        "click",
        analyzeImage
    );

}


async function analyzeImage() {

    if (!selectedFile) {

        showError(
            currentLanguage === "hi"
                ? "कृपया पहले एक तस्वीर चुनें।"
                : "Please select an image first."
        );

        return;

    }


    hideAllResults();

    resultLoading.classList.remove(
        "hidden"
    );


    resultState.textContent =
        currentLanguage === "hi"
            ? "विश्लेषण हो रहा है"
            : "Analyzing";


    analyzeButton.disabled =
        true;


    const formData =
        new FormData();


    /*
     * IMPORTANT:
     *
     * Backend expects:
     *
     * request.files["image"]
     *
     * Therefore the field name MUST be "image".
     */
    formData.append(
        "image",
        selectedFile
    );


    /*
     * Tell backend which language the
     * user selected.
     */
    const url =
        `${API_PREDICT_URL}?lang=${encodeURIComponent(currentLanguage)}`;


    try {

        const response =
            await fetch(
                url,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept-Language":
                            currentLanguage === "hi"
                                ? "hi-IN,hi;q=0.9,en;q=0.8"
                                : "en-IN,en;q=0.9"
                    }
                }
            );


        let data = null;


        try {

            data =
                await response.json();

        } catch {

            throw new Error(
                currentLanguage === "hi"
                    ? "Backend से मान्य JSON उत्तर नहीं मिला।"
                    : "Backend did not return a valid JSON response."
            );

        }


        if (!response.ok) {

            const backendMessage =
                data?.message ||
                data?.error?.message ||
                (
                    currentLanguage === "hi"
                        ? "विश्लेषण विफल हुआ।"
                        : "Analysis failed."
                );

            throw new Error(
                backendMessage
            );

        }


        window.lastPredictionResponse =
            data;


        renderPrediction(data);


    } catch (error) {

        console.error(
            "Prediction error:",
            error
        );


        showError(
            error.message ||
            (
                currentLanguage === "hi"
                    ? "Backend से संपर्क नहीं हो सका।"
                    : "Could not connect to the backend."
            )
        );

    } finally {

        analyzeButton.disabled =
            false;

    }

}


/* =========================================================
   RENDER PREDICTION
========================================================= */

function renderPrediction(data) {

    hideAllResults();

    resultContent.classList.remove(
        "hidden"
    );


    resultState.textContent =
        currentLanguage === "hi"
            ? "विश्लेषण पूरा हुआ"
            : "Analysis completed";


    const detections =
        Array.isArray(data?.detections)
            ? data.detections
            : [];


    /*
     * No detections.
     */
    if (detections.length === 0) {

        document.getElementById(
            "damage-class"
        ).textContent =
            currentLanguage === "hi"
                ? "कोई क्षति नहीं मिली"
                : "No damage detected";

    } else {

        document.getElementById(
            "damage-class"
        ).textContent =
            translateDamageClass(
                detections[0].class
            );

    }


    /*
     * Detection count.
     */
    document.getElementById(
        "detection-count"
    ).textContent =
        String(detections.length);


    /*
     * Confidence.
     */
    const firstDetection =
        detections[0];


    const confidence =
        firstDetection?.confidence;


    document.getElementById(
        "confidence-value"
    ).textContent =
        formatConfidence(confidence);


    /*
     * Severity.
     */
    document.getElementById(
        "severity-value"
    ).textContent =
        translateSeverity(
            firstDetection?.severity
        );


    /*
     * Location.
     */
    document.getElementById(
        "location-value"
    ).textContent =
        safeDisplayValue(
            data?.location
        );


    /*
     * Road information.
     */
    document.getElementById(
        "road-value"
    ).textContent =
        safeDisplayValue(
            data?.road_information
        );


    /*
     * Detection table.
     */
    renderDetectionTable(
        detections
    );


    /*
     * Annotated image.
     */
    renderAnnotatedImage(
        data?.annotated_image
    );


    /*
     * Backend message.
     */
    const backendMessage =
        document.getElementById(
            "backend-message"
        );


    if (data?.message) {

        backendMessage.textContent =
            data.message;

    } else {

        backendMessage.textContent =
            "";

    }


    announce(
        currentLanguage === "hi"
            ? `विश्लेषण पूरा हुआ। ${detections.length} पहचान मिली।`
            : `Analysis completed. ${detections.length} detection(s) found.`
    );

}


/* =========================================================
   CONFIDENCE
========================================================= */

function formatConfidence(value) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return "—";
    }


    let number =
        Number(value);


    if (Number.isNaN(number)) {
        return String(value);
    }


    /*
     * If model returns 0.94,
     * convert to 94%.
     *
     * If model returns 94,
     * keep 94%.
     */
    if (number <= 1) {
        number *= 100;
    }


    return `${number.toFixed(1)}%`;

}


/* =========================================================
   SAFE DISPLAY
========================================================= */

function safeDisplayValue(value) {

    if (
        value === null ||
        value === undefined ||
        value === "" ||
        value === "unknown"
    ) {

        return currentLanguage === "hi"
            ? "उपलब्ध नहीं"
            : "Not available";

    }


    if (
        typeof value === "object"
    ) {

        return JSON.stringify(
            value
        );

    }


    return String(value);

}


/* =========================================================
   DETECTION TABLE
========================================================= */

function renderDetectionTable(
    detections
) {

    const body =
        document.getElementById(
            "detections-body"
        );


    body.innerHTML = "";


    if (!detections.length) {

        const row =
            document.createElement("tr");


        const cell =
            document.createElement("td");


        cell.colSpan = 4;

        cell.textContent =
            currentLanguage === "hi"
                ? "कोई पहचान नहीं मिली।"
                : "No detections found.";


        row.appendChild(cell);

        body.appendChild(row);

        return;

    }


    detections.forEach(
        (detection) => {

            const row =
                document.createElement("tr");


            const classCell =
                document.createElement("td");

            classCell.textContent =
                translateDamageClass(
                    detection?.class
                );


            const confidenceCell =
                document.createElement("td");

            confidenceCell.textContent =
                formatConfidence(
                    detection?.confidence
                );


            const severityCell =
                document.createElement("td");

            severityCell.textContent =
                translateSeverity(
                    detection?.severity
                );


            const bboxCell =
                document.createElement("td");

            bboxCell.textContent =
                formatBoundingBox(
                    detection?.bbox
                );


            row.appendChild(
                classCell
            );

            row.appendChild(
                confidenceCell
            );

            row.appendChild(
                severityCell
            );

            row.appendChild(
                bboxCell
            );


            body.appendChild(row);

        }
    );

}


/* =========================================================
   BOUNDING BOX
========================================================= */

function formatBoundingBox(bbox) {

    if (!bbox) {
        return "—";
    }


    if (Array.isArray(bbox)) {

        return `[${bbox.join(", ")}]`;

    }


    if (
        typeof bbox === "object"
    ) {

        return [
            bbox.x1,
            bbox.y1,
            bbox.x2,
            bbox.y2
        ]
            .map(
                value =>
                    value === undefined
                        ? "?"
                        : value
            )
            .join(", ");

    }


    return String(bbox);

}


/* =========================================================
   ANNOTATED IMAGE
========================================================= */

function renderAnnotatedImage(
    annotatedImage
) {

    const wrapper =
        document.getElementById(
            "annotated-result"
        );

    const image =
        document.getElementById(
            "annotated-image"
        );


    if (!annotatedImage) {

        wrapper.classList.add(
            "hidden"
        );

        image.removeAttribute(
            "src"
        );

        return;

    }


    let imageUrl =
        annotatedImage;


    /*
     * Backend may return:
     *
     * /api/v1/results/file.jpg
     *
     * or a complete URL.
     */
    if (
        typeof imageUrl === "string" &&
        imageUrl.startsWith("/")
    ) {

        imageUrl =
            `${API_BASE}${imageUrl}`;

    }


    image.src =
        imageUrl;


    image.alt =
        currentLanguage === "hi"
            ? "AI द्वारा चिह्नित सड़क क्षति परिणाम"
            : "AI annotated road damage result";


    wrapper.classList.remove(
        "hidden"
    );

}


/* =========================================================
   RETRY
========================================================= */

if (retryButton) {

    retryButton.addEventListener(
        "click",
        () => {

            hideAllResults();

            resultEmpty.classList.remove(
                "hidden"
            );

            resultState.textContent =
                translations[
                    currentLanguage
                ].result_waiting;

        }
    );

}


/* =========================================================
   BACKEND HEALTH CHECK
========================================================= */

async function checkBackend() {

    try {

        const response =
            await fetch(
                API_HEALTH_URL,
                {
                    method: "GET"
                }
            );


        if (!response.ok) {
            throw new Error(
                "Backend unavailable"
            );
        }


        const data =
            await response.json();


        setBackendStatus(
            "online",
            getHealthMessage(data)
        );


    } catch (error) {

        console.warn(
            "Backend health check failed:",
            error
        );


        setBackendStatus(
            "offline",
            currentLanguage === "hi"
                ? "Backend ऑफलाइन"
                : "Backend offline"
        );

    }

}


/* =========================================================
   HEALTH MESSAGE
========================================================= */

function getHealthMessage(data) {

    /*
     * We intentionally do not assume
     * one exact health response structure.
     *
     * This keeps the frontend compatible
     * with the backend scaffold.
     */

    if (
        data?.model_loaded === true ||
        data?.model?.loaded === true
    ) {

        return currentLanguage === "hi"
            ? "Backend + AI मॉडल जुड़ा है"
            : "Backend + AI connected";

    }


    if (
        data?.demo_mode === true ||
        data?.mode === "demo"
    ) {

        return currentLanguage === "hi"
            ? "Backend ऑनलाइन • Demo Mode"
            : "Backend online • Demo Mode";

    }


    return currentLanguage === "hi"
        ? "Backend ऑनलाइन"
        : "Backend online";

}


/* =========================================================
   BACKEND STATUS
========================================================= */

function setBackendStatus(
    status,
    message
) {

    apiDot.classList.remove(
        "online",
        "warning",
        "offline"
    );


    if (status === "online") {

        apiDot.classList.add(
            "online"
        );

    } else if (status === "warning") {

        apiDot.classList.add(
            "warning"
        );

    } else {

        apiDot.classList.add(
            "offline"
        );

    }


    apiStatusText.textContent =
        message;

}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                mainNav.classList.toggle(
                    "open"
                );


            mobileMenuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );

}


document
    .querySelectorAll(".nav-link")
    .forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                mainNav.classList.remove(
                    "open"
                );

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    navLinks.forEach(
                        (link) => {

                            link.classList.remove(
                                "active"
                            );


                            if (
                                link.getAttribute(
                                    "href"
                                ) ===
                                `#${entry.target.id}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        }
                    );

                }
            );

        },
        {
            rootMargin:
                "-30% 0px -60% 0px"
        }
    );


sections.forEach(
    section =>
        observer.observe(section)
);


/* =========================================================
   FONT CONTROLS
========================================================= */

const decreaseFont =
    document.getElementById(
        "decrease-font"
    );

const normalFont =
    document.getElementById(
        "normal-font"
    );

const increaseFont =
    document.getElementById(
        "increase-font"
    );


if (decreaseFont) {

    decreaseFont.addEventListener(
        "click",
        () => {

            applyFontScale(
                currentFontScale - 0.05
            );

        }
    );

}


if (normalFont) {

    normalFont.addEventListener(
        "click",
        () => {

            applyFontScale(1);

        }
    );

}


if (increaseFont) {

    increaseFont.addEventListener(
        "click",
        () => {

            applyFontScale(
                currentFontScale + 0.05
            );

        }
    );

}


/* =========================================================
   YEAR
========================================================= */

const yearElement =
    document.getElementById(
        "current-year"
    );


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
         * Language first.
         */
        loadSavedLanguage();


        /*
         * Accessibility font setting.
         */
        loadFontScale();


        /*
         * Check Flask backend.
         */
        checkBackend();

    }
);


/* =========================================================
   RECHECK BACKEND EVERY 30 SECONDS
========================================================= */

setInterval(
    checkBackend,
    30000
);