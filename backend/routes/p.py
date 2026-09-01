import re 
text = "python programming"

if re.search("programming",text):
    print("found")
else:
    print("Not Found")
    