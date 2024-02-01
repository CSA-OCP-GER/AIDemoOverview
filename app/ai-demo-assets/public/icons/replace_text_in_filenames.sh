#!/bin/bash

# This script replaces text in filenames within the current directory

# Check if two arguments were given
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 search_text replace_text"
    exit 1
fi

# Assign arguments to variables for clarity
SEARCH_TEXT=$1
REPLACE_TEXT=$2

# Loop through all files containing the search text
for file in *"$SEARCH_TEXT"*; do
    # Skip if it's a directory
    if [ ! -f "$file" ]; then
        continue
    fi

    # Replace the text in the filename
    new_name=$(echo "$file" | sed "s/$SEARCH_TEXT/$REPLACE_TEXT/g")

    # Check if the new filename already exists
    if [ -e "$new_name" ]; then
        echo "Error: '$new_name' already exists. Skipping '$file'."
        continue
    fi

    # Rename the file
    mv -- "$file" "$new_name"
    echo "Renamed '$file' to '$new_name'"
done

