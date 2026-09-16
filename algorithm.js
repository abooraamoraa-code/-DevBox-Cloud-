/**
 * ==============================================================================
 * DevBox Cloud - Advanced Algorithm & Optimization Engine (v2.0)
 * الهندسة والخوارزميات البرمجية: أبو حازم العمري
 * الوظيفة: معالجة الأكواد، الضغط السريع، فحص الأمان، وإدارة التدفق اللحظي.
 * ==============================================================================
 */

const DevBoxEngine = (() => {
    
    // خوارزمية تنظيف النصوص والأكواد من الرموز الخطيرة (Sanitization)
    function sanitizeCode(inputString) {
        if (!inputString) return "";
        return inputString
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "[تم حظر سكربت خارجي غير مرغوب فيه]")
            .trim();
    }

    // خوارزمية ضغط البيانات وتوليد معرفات فريدة للمشاريع (ID & Compression Generator)
    function generateProjectID(title) {
        const cleanTitle = title.toLowerCase().replace(/[^a-z0-9а-яà-öø-ÿء-ي]/g, '_');
        const uniqueSuffix = Date.now().toString(36);
        return `proj_${cleanTitle}_${uniqueSuffix}`;
    }

    // خوارزمية تجميع ودمج الأكواد (HTML, CSS, JS) في حزمة واحدة جاهزة للتشغيل الفوري
    function bundleProject(htmlContent, cssContent, jsContent = "") {
        const safeHTML = sanitizeCode(htmlContent);
        const safeCSS = sanitizeCode(cssContent);
        const safeJS = sanitizeCode(jsContent);

        return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* التنسيقات المدمجة عبر خوارزمية أبو حازم العمري */
        ${safeCSS}
    </style>
</head>
<body>
    ${safeHTML}
    <script>
        try {
            ${safeJS}
        } catch (err) {
            console.error("خطأ في تنفيذ سكربت المشروع:", err);
        }
    </script>
</body>
</html>`;
    }

    // خوارزمية تحويل الحزمة إلى Data URI للتشغيل الفوري دون الحاجة لرفع ملفات مادية
    function createLiveURI(bundledCode) {
        return 'data:text/html;charset=utf-8,' + encodeURIComponent(bundledCode);
    }

    // خوارزمية التحقق من صحة المدخلات وسرعة الاستجابة (Debounce Utility)
    function createDebounce(fn, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // إرجاع واجهة البرمجة العامة (Public API) للخوارزمية
    return {
        sanitize: sanitizeCode,
        generateID: generateProjectID,
        bundle: bundleProject,
        toURI: createLiveURI,
        debounce: createDebounce,
        author: "أبو حازم العمري",
        version: "2.0.0-Enterprise"
    };

})();

// تصدير المحرك للاستخدام العام في باقي ملفات المنصة
window.DevBoxEngine = DevBoxEngine;
console.log("⚡ DevBox Algorithm Engine loaded successfully by أبو حازم العمري.");
