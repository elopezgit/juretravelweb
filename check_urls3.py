import urllib.request

urls = [
    "https://images.unsplash.com/photo-1540544520779-798b36da401b?q=80&w=600",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=600",
    "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=600",
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600",
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600",
    "https://images.unsplash.com/photo-1534430238128-56e6d1872dc6?q=80&w=600",
    "https://images.unsplash.com/photo-1538965688537-8e6d2bc00b21?q=80&w=600",
    "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=600",
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=600",
    "https://images.unsplash.com/photo-1528605105345-5344ea20e269?q=80&w=600",
    "https://images.unsplash.com/photo-1548625361-f673f4e19b66?q=80&w=600",
    "https://images.unsplash.com/photo-1582298538104-fe2e74c87fb2?q=80&w=600",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600",
    "https://images.unsplash.com/photo-1558981420-8cea99705d28?q=80&w=600"
]

valid_urls = []
for u in urls:
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req)
        if res.status == 200:
            valid_urls.append(u)
    except Exception as e:
        pass

print("Valid URLs:")
for v in valid_urls:
    print(v)
