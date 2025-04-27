module Jekyll
  class TagPageGenerator < Generator
    safe true

    def generate(site)
      site.tags.each do |tag, posts|
        site.pages << TagPage.new(site, site.source, tag, posts)
      end
    end
  end

  class TagPage < Page
    def initialize(site, base, tag, posts)
      @site = site
      @base = base
      @dir = 'tag'
      @name = "#{tag.to_s.slugify}.html"

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag.html')
      self.data['tag'] = tag
      self.data['title'] = "#{tag.capitalize} Articles"
      self.data['posts'] = posts
      # This makes the URL appear without .html
      self.data['permalink'] = "/tag/#{tag.to_s.slugify}/"
    end
  end
end
