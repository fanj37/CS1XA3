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

if [[ "$1" == "2" ]]
	then
		grep -nr “#TODO” ~/CS1XA3 > ~/CS1XA3/Project01/todo.log

fi


if [[ "$1" == "4" ]]
	then
		{
			rm -f "merge.log"
			log=`git log --oneline`
			while read -r allcommit; do
				if [[ ! -z `echo $allcommit | grep "Merge"` ]]; then
					goal=`echo $allcommit | cut -d " " -f 1`
					echo $goal >> merge.log
					echo "$goal"
				fi
			done <<< $log
		}
fi


if [[ "$1" == "ex" ]]
	then
		ifconfig | grep "inet addr:" | awk '{ print $2 }' | sed 's/addr://g'
fi
