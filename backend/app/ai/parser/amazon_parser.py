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

                title = card.locator("h2 span").inner_text()

            except:
                title = ""

            try:

                whole = card.locator("span.a-price-whole").first.inner_text()

                fraction = card.locator("span.a-price-fraction").first.inner_text()

                price = f"{whole}.{fraction}"

            except:

                price = ""

            try:

                href = card.locator("h2 a").first.get_attribute("href")

                url = "https://www.amazon.in" + href

            except:

                url = ""

            products.append(
                {
                    "title": title,
                    "price": price,
                    "url": url,
                }
            )

        return products