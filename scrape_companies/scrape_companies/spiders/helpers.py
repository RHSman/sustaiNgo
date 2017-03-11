import unicodedata

def parse_encode(listitem):
    print "parse"
    print len(listitem)
    if len(listitem) > 0:
        return str(unicodedata.normalize('NFKD', listitem[0]).encode('ascii', 'ignore').lower())
    else:
        return None

def parse_encode_nolist(name):
    item = str(unicodedata.normalize('NFKD', name).encode('ascii','ignore').lower())
    item = item.rstrip()
    item = item.lstrip()
    return item

def score_category(category):
    cat_dict = {
        "unspecified": 0,
        "made in the uk": 1,
        "vegan materials": 2,
        "organic cotton": 3,
        "fair trade": 4,
        "sustainable fabrics": 5,
        "recycled": 6
    }
    value = cat_dict[category]
    return value