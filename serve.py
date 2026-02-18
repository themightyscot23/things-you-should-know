#!/usr/bin/env python3
"""
Simple development server for Things You Should Know.
Run this and open http://localhost:8000 in your browser.

Usage:
    python3 serve.py
    python3 serve.py 3000    # custom port
"""
import http.server
import socketserver
import webbrowser
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

os.chdir(DIRECTORY)

Handler = http.server.SimpleHTTPRequestHandler

print(f"Serving 'Things You Should Know' at http://localhost:{PORT}")
print("Press Ctrl+C to stop.\n")

webbrowser.open(f"http://localhost:{PORT}")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
