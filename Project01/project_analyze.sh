if [[ "$1" == "6" ]]
	then
		newfile=$(git ls-files . --exclude-standard --others)
		for file in $newfile
		do
			if [[ "$file" == *.tmp ]]
				then
					rm $file
			fi
		done
fi

