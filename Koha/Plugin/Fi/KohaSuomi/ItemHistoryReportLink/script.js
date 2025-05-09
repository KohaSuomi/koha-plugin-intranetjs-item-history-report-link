$(document).ready(function () {
    if (window.location.pathname === '/cgi-bin/koha/catalogue/moredetail.pl') {
        // Check if the page contains actual items (= has more than one section)
        if ($('div.page-section.clearfix').length > 0) {

            const havaintoRaportti = REPLACE_BY_CONFIG_PARAM_A; // Change this to the desired report ID

            // We can obtain the itemnumber from the <h3> element of each section (item)
            $('h3[id^="item"]').each(function () {
                const id = $(this).attr('id');
                const itemNumber = id.replace('item', '');

                // Build a link to the report
                const reportUrl = `/cgi-bin/koha/reports/guided_reports.pl?id=${havaintoRaportti}&param_name=itemnumber&sql_params=${itemNumber}&op=run`;

                // Create a new <li> element with the wanted attributes for the report link
                const uiLanguage = $('html').attr('lang'); // Get the UI language from the <html> tag
                let labelText = 'Havaintohistoria: ';
                let linkText = 'Raportti';

                // Set translations based on the UI language
                if (uiLanguage === 'en') {
                    labelText = 'Item history: ';
                    linkText = 'Report';
                } else if (uiLanguage === 'sv-SE') {
                    labelText = 'Historik: ';
                    linkText = ' Rapport';
                }

                const newLi = $('<li>').append(
                    $('<span>')
                        .addClass('label')
                        .text(labelText),
                    $('<a>')
                        .attr('href', `${reportUrl}`)
                        .attr('id', `link-item-${itemNumber}`) // This is not mandatory, but helpful for possible future uses
                        .attr('class', 'havaintohistoria')
                        .text(linkText)
                );

                // Determine where the link (<li> element) is placed (in this case at the top of the Historia section)
                const targetDiv = $(this).parent().siblings('.listgroup').eq(2);
                const targetOl = targetDiv.children('.rows').children('ol.bibliodetails');

                // Check if the targetDiv and targetOl exist before appending (just in case)
                if (targetDiv.length && targetOl.length) {
                    targetOl.prepend(newLi);
                }
            });
        }
    }

    // Event handler to open the link in a popup window
    $('body').on('click', '.havaintohistoria', function (e) {
        e.preventDefault(); // Prevent the default link behavior
        const reportUrl = $(this).attr('href'); // Get the href of the clicked link
        window.open(
            reportUrl,
            'popup',
            'width=1280,height=720,resizable=no,toolbar=false,scrollbars=yes,top=100,left=100'
        );
    });
});