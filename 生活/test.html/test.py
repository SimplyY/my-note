import xml
file_name = input("input file_name: ")
def readHtmlFile():
    try:
        file = open(file_name, "r")
        html = file.read()
    except IOError:
        print("file_name is wrong")
    finally:
        file.close()
    return html

print(readHtmlFile())
