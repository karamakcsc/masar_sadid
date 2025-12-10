frappe.ui.form.on("Journal Entry", {
    user_remark: function(frm) {
        if (frm.doc.user_remark) {
            frappe.call({
                method: "masar_sadid.api.translate_to_arabic",
                args: {
                    text: frm.doc.user_remark
                },
                callback: function(r) {
                    if (r.message) {
                        frm.set_value("custom_user_remark_ar", r.message);
                    }
                }
            });
        } else {
            frm.set_value("custom_user_remark_ar", "");
        }
    }
});



frappe.ui.form.on("Journal Entry", {
    custom_user_remark_ar: function(frm) {
        if (frm.doc.custom_user_remark_ar) {
            frappe.call({
                method: "masar_sadid.api.translate_to_english",
                args: {
                    text: frm.doc.custom_user_remark_ar
                },
                callback: function(r) {
                    if (r.message) {
                        frm.set_value("user_remark", r.message);
                    }
                }
            });
        } else {
            frm.set_value("user_remark", "");
        }
    }
});