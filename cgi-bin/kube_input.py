#!/usr/bin/python3

print("content-type:text/plain")
print()

import cgi
import subprocess as s

input = cgi.FieldStorage()

command = input.getvalue("cmd")

status = s.getoutput("sudo "+command+" --kubeconfig=admin.conf")
print(status)
