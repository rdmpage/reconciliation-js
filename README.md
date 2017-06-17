# Reconciliation service API example

Implemement an [OpenRefine reconciliation service API](https://github.com/OpenRefine/OpenRefine/wiki/Reconciliation-Service-API). This example uses CrossRef's API to convert citation strings into DOIs.

Once data is reconciled you can creat a column of DOIs by clicking on the header of the column containing the citation strings and choose *Edit column → Add column based on this column...* and a dialog box will be displayed. In the box labelled *Expression* enter ```cell.recon.match.id``` and give the column a name (e.g., "DOI"). You will now have a column of DOIs for the citation strings.
