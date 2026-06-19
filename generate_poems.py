import re, os

with open('all_poems.txt', 'r', encoding='utf-8') as f:
    text = f.read()

blocks = re.split(r'【(\d+)】', text)
blocks = blocks[1:]

entries = []
for i in range(0, len(blocks), 2):
    num = int(blocks[i])
    content = blocks[i+1].strip()
    lines = content.strip().split('\n')
    title = lines[0].strip()
    author_line = lines[1].strip()
    poem_text = '\n'.join(l.strip() for l in lines[2:] if l.strip())
    
    m = re.match(r'[（(](.+?)[）)]\s*(.*)', author_line)
    if m:
        dynasty = m.group(1)
        author = m.group(2) or ''
        if author:
            full_author = dynasty + '·' + author
        else:
            full_author = dynasty
    else:
        full_author = author_line
    
    # Replace actual newlines with \n escape sequence for JS string
    poem_text = poem_text.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n')
    title = title.replace("'", "\\'")
    full_author = full_author.replace("'", "\\'")
    
    entries.append((num, title, full_author, poem_text))

js_lines = []
js_lines.append('// ========== 古诗词（' + str(len(entries)) + '首）==========')
for num, title, author, content in entries:
    js_lines.append(f"p({5000 + num}, '{title}', '{author}', '{content}')")
    js_lines.append('')

result = '\n'.join(js_lines)
with open('poems_output.js', 'w', encoding='utf-8') as f:
    f.write(result)

print(f"Generated {len(entries)} poem entries")
