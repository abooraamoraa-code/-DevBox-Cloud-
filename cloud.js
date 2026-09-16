/**
 * ==============================================================================
 * DevBox Cloud - Central Cloud & Database Synchronization Engine (v2.0)
 * الهندسة وتطوير الشبكات السحابية: أبو حازم العمري
 * الوظيفة: إدارة الاتصال بقاعدة البيانات السحابية، جلب ونشر المشاريع عالمياً.
 * ==============================================================================
 */

const DevBoxCloud = (() => {
    
    // إعدادات السيرفر السحابي المركزي (JSONBin)
    const CONFIG = {
        apiKey: "$2a$10$Hj8N/vpuugwh9k/pupGakulkBIE4pq3W09JTAUiUKbtJfiWBdpJHS",
        binId: "6aaa882affd5d160530df70d",
        baseUrl: "https://api.jsonbin.io/v3/b"
    };

    // خوارزمية جلب كافة المشاريع والألعاب من السحابة (Global Fetch)
    async function fetchAllProjects() {
        try {
            const response = await fetch(`${CONFIG.baseUrl}/${CONFIG.binId}/latest`, {
                method: 'GET',
                headers: {
                    'X-Master-Key': CONFIG.apiKey
                }
            });

            if (!response.ok) {
                throw new Error(`خطأ في الاتصال السحابي: ${response.status}`);
            }

            const data = await response.json();
            return data.record.games || [];
        } catch (error) {
            console.error("❌ فشل جلب البيانات من السحابة:", error);
            return [];
        }
    }

    // خوارزمية رفع ونشر مشروع جديد إلى السحابة فوراً (Instant Cloud Deploy)
    async function deployProject(projectData) {
        try {
            // 1. جلب البيانات الحالية أولاً لعدم مسح المشاريع السابقة
            let currentGames = await fetchAllProjects();

            // 2. تجهيز كينونة المشروع الجديد
            const newProject = {
                id: DevBoxEngine ? DevBoxEngine.generateID(projectData.title) : `proj_${Date.now()}`,
                title: projectData.title,
                dev_name: "أبو حازم العمري",
                category: projectData.category || "تطبيقات سحابية DevBox",
                link: projectData.link,
                timestamp: new Date().toISOString(),
                status: "معتمد إمبراطورياً"
            };

            // 3. إضافة المشروع للقائمة
            currentGames.unshift(newProject); // وضع المشروع الجديد في المقدمة

            // 4. إرسال القائمة المحدثة بالكامل إلى السيرفر (PUT Request)
            const updateResponse = await fetch(`${CONFIG.baseUrl}/${CONFIG.binId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': CONFIG.apiKey
                },
                body: JSON.stringify({ games: currentGames })
            });

            if (!updateResponse.ok) {
                throw new Error("فشل عملية التحديث على السيرفر الخارجي.");
            }

            console.log("🚀 تم نشر المشروع بنجاح وتم مزامنته عالمياً!");
            return { success: true, project: newProject };

        } catch (error) {
            console.error("❌ خطأ أثناء النشر السحابي:", error);
            return { success: false, error: error.message };
        }
    }

    // إرجاع واجهة البرمجة السحابية العامة (Public Cloud API)
    return {
        getProjects: fetchAllProjects,
        deploy: deployProject,
        author: "أبو حازم العمري",
        cloudStatus: "متصل بالسرعة القصوى ⚡"
    };

})();

// تصدير المحرك السحابي للاستخدام العام
window.DevBoxCloud = DevBoxCloud;
console.log("☁️ DevBox Cloud Engine connected successfully by أبو حازم العمري.");
