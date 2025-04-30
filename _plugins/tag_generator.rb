module Jekyll
  class TagPageGenerator < Generator
    safe true

    def generate(site)
      site.tags.keys.each do |tag|
        site.pages << TagPage.new(site, site.source, tag)
      end
    end
  end

  class TagPage < Page
    def initialize(site, base, tag)
      @site = site
      @base = base
      @dir = File.join('tag', tag.downcase.gsub(/\s+/, '-').gsub(/[^\w-]/, ''))
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag.html')
      self.data['tag'] = tag
      self.data['title'] = "#{tag.capitalize} Articles"
      self.data['description'] = "Collection of articles about #{tag.capitalize} by Ghazi Khan - I am an open source developer and I love building simple solutions for complex technical problems."
      self.data['permalink'] = "/#{@dir}/"
    end
  end
end 