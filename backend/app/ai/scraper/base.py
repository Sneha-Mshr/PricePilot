from playwright.sync_api import sync_playwright


class BaseScraper:

    def launch_browser(self):

        playwright = sync_playwright().start()

        browser = playwright.chromium.launch(
            headless=False
        )

        page = browser.new_page()

        return playwright, browser, page