from playwright.sync_api import Page


class AmazonParser:

    def parse(self, page: Page):

        products = []

        cards = page.locator("[data-component-type='s-search-result']")

        print("Amazon: Total Cards Found:", cards.count())

        count = min(cards.count(), 8)

        for i in range(count):

            card = cards.nth(i)

            try:
                title = card.locator("h2").inner_text()
            except:
                title = ""

            try:
                price = card.locator(".a-price-whole").first.inner_text()
                price = price.replace(",", "").replace(".", "").strip()
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

            try:
                img_el = card.locator("img.s-image").first
                image = img_el.get_attribute("src") or ""
            except:
                image = ""

            try:
                rating_el = card.locator("span.a-icon-alt").first
                rating = rating_el.inner_text().split(" ")[0] if rating_el.count() > 0 else ""
            except:
                rating = ""

            if not title:
                continue

            products.append(
                {
                    "title": title,
                    "price": price,
                    "url": url,
                    "image": image,
                    "rating": rating,
                    "source": "Amazon",
                }
            )

        return products
