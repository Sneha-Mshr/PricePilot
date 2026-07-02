from playwright.sync_api import Page


class AmazonParser:

    def parse(self, page: Page):

        products = []

        cards = page.locator("[data-component-type='s-search-result']")

        print("Total Cards Found:", cards.count())

        count = min(cards.count(), 5)

        for i in range(count):

            card = cards.nth(i)

            try:
                title = card.locator("h2").inner_text()
            except:
                title = ""

            try:
                price = card.locator(".a-price-whole").first.inner_text()
            except:
                price = ""

            try:
                href = card.locator("h2 a").first.get_attribute("href")

                if href:
                    url = "https://www.amazon.in" + href
                else:
                    url = ""

            except:
                url = ""

            print("----------------------")
            print("TITLE :", title)
            print("PRICE :", price)
            print("URL   :", url)

            products.append(
                {
                    "title": title,
                    "price": price,
                    "url": url,
                }
            )

        return products