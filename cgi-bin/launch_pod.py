#!/usr/bin/python3

import cgi
from subprocess import getoutput as g

print("content-type:text/plain")
print()

form_values = cgi.FieldStorage()

pod_name = form_values.getvalue("pod")
pod_name = pod_name.lower()
image_name = form_values.getvalue("img")

status = g("sudo kubectl run "+pod_name+" --image="+image_name+" --kubeconfig=admin.conf")

print(status)
