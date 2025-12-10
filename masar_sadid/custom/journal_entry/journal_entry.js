frappe.ui.form.on("Journal Entry", {
    user_remark: function(frm) {
        if (frm.translating) return;
        
        // إلغاء أي ترجمة سابقة معلقة
        if (frm.translation_timeout) {
            clearTimeout(frm.translation_timeout);
        }
        
        if (frm.doc.user_remark) {
            // تأخير الترجمة لمدة 500ms
            frm.translation_timeout = setTimeout(function() {
                frm.translating = true;
                
                frappe.call({
                    method: "masar_sadid.api.translate_to_arabic",
                    args: {
                        text: frm.doc.user_remark
                    },
                    callback: function(r) {
                        if (r.message) {
                            frm.set_value("custom_user_remark_ar", r.message);
                        }
                        frm.translating = false;
                    }
                });
            }, 500);
        } else {
            frm.set_value("custom_user_remark_ar", "");
        }
    },

    custom_user_remark_ar: function(frm) {
        if (frm.translating) return;
        
        if (frm.translation_timeout) {
            clearTimeout(frm.translation_timeout);
        }
        
        if (frm.doc.custom_user_remark_ar) {
            frm.translation_timeout = setTimeout(function() {
                frm.translating = true;
                
                frappe.call({
                    method: "masar_sadid.api.translate_to_english",
                    args: {
                        text: frm.doc.custom_user_remark_ar
                    },
                    callback: function(r) {
                        if (r.message) {
                            frm.set_value("user_remark", r.message);
                        }
                        frm.translating = false;
                    }
                });
            }, 500);
        } else {
            frm.set_value("user_remark", "");
        }
    }
});