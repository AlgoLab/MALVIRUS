all: html

html: HELP.md
	@echo -n "Compiling to html.."
	@pandoc --metadata date="Last update: `date +%d/%m/%Y`" --css pandoc.css -s HELP.md --bibliography biblio.bib -o HELP.html
	@echo "done."
	@echo "Document available at HELP.html"

pdf: HELP.md
	@echo -n "Compiling to pdf.."
	@pandoc --metadata date="Last update: `date +%d/%m/%Y`" --css pandoc.css -s HELP.md --bibliography biblio.bib -o HELP.pdf
	@echo "done."
	@echo "Document available at HELP.pdf"

clean:
	rm HELP.html
