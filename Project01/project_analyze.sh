deleteFiles(){
        newfile=$(git ls-files $REPO_ROOT_PATH --exclude-standard --others)
        for file in $newfile
        do
                if [[ "$file" == *.tmp ]]
                        then
                                rm $file
                fi
        done
}



if [[ "$1" == "6" ]]
	then
		deleteFiles
fi

