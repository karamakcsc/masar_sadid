import frappe
from googletrans import Translator

# @frappe.whitelist()
# def translate_to_arabic(text):
#     """Translate English text to Arabic using free Google Translate"""
#     if not text:
#         return ""

#     try:
#         translator = Translator()
#         translated = translator.translate(text, src='en', dest='ar')
#         return translated.text

#     except Exception as e:
#         frappe.log_error(frappe.get_traceback(), "Translation Error")
#         return "Translation failed"




# @frappe.whitelist()
# def translate_to_english(text):
#     """Translate Arabic text to English using free Google Translate"""
#     if not text:
#         return ""

#     try:
#         translator = Translator()
#         translated = translator.translate(text, src='ar', dest='en')
#         return translated.text

#     except Exception as e:
#         frappe.log_error(frappe.get_traceback(), "Translation Error")
#         return "Translation failed"

@frappe.whitelist()
def translate_to_arabic(text):
    """Translate English text to Arabic"""
    if not text:
        return ""

    try:
        translated = Translator(source='en', target='ar').translate(text)
        return translated

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Translation Error (EN to AR)")
        return "Translation failed"

@frappe.whitelist()
def translate_to_english(text):
    """Translate Arabic text to English"""
    if not text:
        return ""

    try:
        translated = Translator(source='ar', target='en').translate(text)
        return translated

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Translation Error (AR to EN)")
        return "Translation failed"