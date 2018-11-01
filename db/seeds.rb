cities = ActiveSupport::JSON.decode(File.read('db/seeds/villes.json'))

def scoring(monument)
  score_twitter = monument['twitter']['len_tweets'] + monument['twitter']['mean_replies'] + monument['twitter']['mean_retweets'] + monument['twitter']['mean_likes']
  score_yelp = monument['yelp']['score_yelp']['score_yelp_review_count'] + monument['yelp']['score_yelp']['score_yelp_rating']
  score_wiki = monument['score_wiki']
  score = score_twitter + score_yelp + score_wiki
  return score
end

cities.each do |city|
  # Create the city
  ville = City.new(name: city['name'])
  ville.remote_photo_url = city['photo']
  ville.save
  puts "#{ville.name} created"

  # Read the monuments of said city
  data = ActiveSupport::JSON.decode(File.read("db/seeds/#{city['json']}.json"))
  data.each do |monument|
    mon = Monument.new(
      name: monument['name'],
      address: monument['address'],
      latitude: monument['coordinates']['latitude'],
      longitude: monument['coordinates']['longitude'],
      description: monument['description'],
      score: scoring(monument)
      # Ajouter horaires quand présent
      # Ajouter protection
    )
    mon.city = ville
    mon.remote_photo_url = monument['photo']
    mon.save

    puts "#{mon.name} created in #{ville.name}"
  end
end
