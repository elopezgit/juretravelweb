import urllib.request
urls = [
    'https://images.unsplash.com/photo-1540544520779-798b36da401b?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563604084534-1901a5fa60dd?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1566378411036-748c8b41bb16?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1562916895-5a50e972e6b7?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550953683-ee9bfa11b6d2?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1579730531585-8167f1853d9e?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop'
]

for u in urls:
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req)
        print(f'{u}: {res.status}')
    except Exception as e:
        print(f'{u}: ERROR {e}')
