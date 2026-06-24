import urllib.request
urls = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533742724831-29cf9a3e20ec?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505993597083-3bd19fd75e77?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518314916590-58d53cb1c9bc?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600&auto=format&fit=crop'
]

for u in urls:
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req)
        print(f'{u}: {res.status}')
    except Exception as e:
        print(f'{u}: ERROR {e}')
