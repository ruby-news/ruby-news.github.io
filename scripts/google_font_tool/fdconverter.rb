# Paste your google fonts here
sass = IO.read(File.join(__dir__, 'sample.scss.txt'))

filename = File.basename(__FILE__)
Dir.children(__dir__).each { |x|
	next if x == filename
	File.delete(x) if File.exist?(x)
}

require 'net/https'
lines = sass.lines
fin = ''

lines.each_with_index { |x, i|
	if x[/src: url\(.*\).*/]
		family = lines[i - 4].split(?:)[-1].delete(%Q('";)) &.strip
		next unless family

		weight = lines[i - 2].split(?:)[-1].delete(?;) &.strip
		next unless weight

		head = lines[i - 6].delete(%Q(/*/)).strip
		next unless head

		n = x.strip.split(?:).drop(1).join(?:)[/url\(.*?\)/][4..-2]
		uri = URI(n)
		path = File.split(uri.path)[-1]

		filename = "#{family}-#{head}-#{weight}.woff2"

		puts "Downloading #{uri} as #{filename}"
		data = Net::HTTP.get(uri)
		puts "Downloaded #{filename}\n\n\n"

		IO.write(File.join(__dir__, 'fonts', filename), data)

		fin << lines[i - 6 .. i - 5].join
		fin << lines[i - 4 .. i - 1].map { |z| "\t#{z.strip}" }.join(?\n)
		fin << "\n\tsrc: url('/assets/fonts/#{filename}');\n"
		fin << "\t#{lines[i + 1].strip}\n"
		fin << "#{lines[i + 2].strip}"
		fin << ?\n * 2
	end
}

puts fin
