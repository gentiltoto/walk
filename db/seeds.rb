# RAJOUTER CONDITION SUR LES LAT LONG NIL !!!!
cities = ActiveSupport::JSON.decode(File.read('db/seeds/villes.json'))

def scoring(monument, city) #City = json file des monuments de la city #MONUMENT = object de l'arr du JSON
  compteur_wiki = 0
  data = ActiveSupport::JSON.decode(File.read("db/seeds/#{city}.json")) #ATTENTION SUR LE JSON, le nom peut avoir changé
  # WIKIPEDIA
  data.each do |monuments_city|
    compteur_wiki += 1 if monument["score_wiki"] > monuments_city["score_wiki"]
  end
  score_wiki = compteur_wiki.fdiv(data.size).round(2)
  # YELP
  case monument["yelp"]["score_yelp"]["score_yelp_review_count"]
    when 0
      score_yelp = 0
    when 0 .. 3
      score_yelp = 0.2
    when 4 .. 15
      score_yelp= 0.2 + monument["yelp"]["score_yelp"]["score_yelp_rating"].fdiv(10).round(2)
    else
      score_yelp = 0.5 + monument["yelp"]["score_yelp"]["score_yelp_rating"].fdiv(10).round(2)
  end

  # SCORE_TWITTER
  compteur_tweets = 0
  compteur_likes_tweets = 0
  data.each do |monuments_city|
    compteur_tweets += 1 if monument["twitter"]["len_tweets"] > monuments_city["twitter"]["len_tweets"]
    compteur_likes_tweets += 1 if monument["twitter"]["mean_retweets"] + monument["twitter"]["mean_likes"] > monuments_city["twitter"]["mean_retweets"] + monuments_city["twitter"]["mean_likes"]
  end
  score_twitter = (100 * compteur_tweets.fdiv(data.size) + 20 * compteur_likes_tweets.fdiv(data.size)).fdiv(100).round(2)
  # PATRIMOINE FRANCAIS
  if monument["protection"] == "Inscrit MH"
    score_protection = 50
  else
    score_protection = 20
  end
  return 100 * score_wiki + 75 * score_yelp + 25 * score_twitter + score_protection
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
      score: scoring(monument, city['json'])
      # Ajouter horaires quand présent
      # Ajouter protection
    )
    mon.city = ville
    mon.remote_photo_url = monument['photo']
    mon.save
  end
end
