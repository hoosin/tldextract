# Makefile

#
PUBLIC_SUFFIX_LIST := ./bin/public_suffix_list.dat

URL := https://publicsuffix.org/list/public_suffix_list.dat


all: $(PUBLIC_SUFFIX_LIST)


$(PUBLIC_SUFFIX_LIST): | ./bin/
	curl -o $(PUBLIC_SUFFIX_LIST) $(URL)


./bin/:
	mkdir -p ./bin/


.PHONY: clean
clean:
	rm -f $(PUBLIC_SUFFIX_LIST)
