import re

html_file = r'c:\Users\EDC\Desktop\juretravelweb\index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix images
images_map = {
    '1540544520779-798b36da401b': '1507525428034-b723cf961d3e',
    '1563604084534-1901a5fa60dd': '1519046904884-53103b34b206',
    '1566378411036-748c8b41bb16': '1510414842594-a61c69b5ae57',
    '1562916895-5a50e972e6b7': '1506929562872-bb421503ef21',
    '1550953683-ee9bfa11b6d2': '1499793983690-e29da59ef1c2',
    '1579730531585-8167f1853d9e': '1512453979798-5ea266f8880c'
}
for bad, good in images_map.items():
    content = content.replace(bad, good)

# Change whatsapp buttons to budget links
# Before: <a href="https://wa.me/..." class="btn-card-wa" target="_blank">
#           <i class="fab fa-whatsapp"></i> Consultar
#         </a>
# Or similar in the cards.
# Let's match any <a href="https://wa.me/..." class="btn-card-wa" ...>...</a> inside the dest cards
pattern = re.compile(
    r'<a href="https://wa\.me/[^"]+" class="btn-card-wa" target="_blank">\s*<i class="fab fa-whatsapp"></i> Consultar\s*</a>',
    re.IGNORECASE | re.MULTILINE
)

replacement = '<a href="https://presupuestojuretravel.netlify.app/" target="_blank" class="btn-card-wa external-pulse-link"><i class="fas fa-clipboard-list"></i> Cotizar Ahora</a>'
content = pattern.sub(replacement, content)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated index.html successfully.")
