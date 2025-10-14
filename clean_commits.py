#!/usr/bin/env python3
"""Clean Claude references from git commit messages"""
import sys
import re

# Read commit message from stdin
message = sys.stdin.read()

# Remove Claude references
message = re.sub(r'🤖 Generated with \[Claude Code\]\(https://claude\.com/claude-code\)\s*', '', message)
message = re.sub(r'🤖 Generated with \[Claude Code\]\(https://claude\.ai/code\)\s*', '', message)
message = re.sub(r'Co-Authored-By: Claude <noreply@anthropic\.com>\s*', '', message)

# Remove extra blank lines (more than 2 consecutive newlines)
message = re.sub(r'\n{3,}', '\n\n', message)

# Trim trailing whitespace
message = message.rstrip()

# Print cleaned message
sys.stdout.write(message)