from playwright.sync_api import Page


class FlipkartParser:

    def parse(self, page: Page):

        products = []

        # Flipkart uses _1AtVbE or similar class for product cards
        # Try multiple selectors for robustness
        selectors = [
            "[data-id]",
            "._1AtVbE",
            ".tUxRFH",
            "._75nlfW",
            ".slAVV4",
        ]

        cards = None
        for selector in selectors:
            cards = page.locator(selector)
            if cards.count() > 0:
                break

        if not cards or cards.count() == 0:
            # Fallback: try generic product container
            cards = page.locator("div.cPHDOP.col-12-12")
            if cards.count() == 0:
                print("Flipkart: No product cards found")
                return products

        print(f"Flipkart: Total Cards Found: {cards.count()}")

        count = min(cards.count(), 8)

        for i in range(count):
            card = cards.nth(i)

            try:
                # Title selectors (Flipkart changes class names often)
                title_selectors = [
                    ".KzDlHZ",
                    "._4rR01T",
                    ".s1Q9rs",
                    "a.wjcEIp",
                    ".WKTcLC",
                ]
                title = ""
                for sel in title_selectors:
                    try:
                        el = card.locator(sel).first
                        if el.count() > 0:
                            title = el.inner_text()
                            if title:
                                break
                    except:
                        continue

                if not title:
                    # Try any anchor tag with title attribute
                    try:
                        title = card.locator("a[title]").first.get_attribute("title") or ""
                    except:
                        title = ""

            except:
                title = ""

            try:
                # Price selectors
                price_selectors = [
                    ".Nx9bqj._4b5DiR",
                    "._30jeq3._1_WHN1",
                    "._30jeq3",
                    ".Nx9bqj",
                ]
                price = ""
                for sel in price_selectors:
                    try:
                        el = card.locator(sel).first
                        if el.count() > 0:
                            price = el.inner_text()
                            if price:
                                # Clean price: remove ₹ and commas
                                price = price.replace("₹", "").replace(",", "").strip()
                                break
                    except:
                        continue
            except:
                price = ""

            try:
                # URL
                href = card.locator("a").first.get_attribute("href")
                if href:
                    if href.startswith("/"):
                        url = "https://www.flipkart.com" + href
                    else:
                        url = href
                else:
                    url = ""
            except:
                url = ""

            try:
                # Image
                img_el = card.locator("img").first
                image = img_el.get_attribute("src") or ""
            except:
                image = ""

            try:
                # Rating
                rating_selectors = [".XQDdHH", "._3LWZlK"]
                rating = ""
                for sel in rating_selectors:
                    try:
                        el = card.locator(sel).first
                        if el.count() > 0:
                            rating = el.inner_text()
                            if rating:
                                break
                    except:
                        continue
            except:
                rating = ""

            if not title:
                continue

            products.append({
                "title": title,
                "price": price,
                "url": url,
                "image": image,
                "rating": rating,
                "source": "Flipkart",
            })

        return products
