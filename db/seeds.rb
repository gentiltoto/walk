
lille = City.new(name: "Lille")
lille.save

rihour = Monument.new(name: "Place Rihour", address: "Place Rihour", latitude: "0.00", longitude: "0.00", description: "Une joli description de rihour", score: 1000)
rihour.city = lille
rihour.save

grand_place = Monument.new(name: "Grand Place", address: "Grand Place", latitude: "0.00", longitude: "0.00", description: "Une joli description de grand place", score: 10000)
grand_place.city = lille
grand_place.save

beaux_arts = Monument.new(name: "Musée des Beaux Arts", address: "Répu", latitude: "0.00", longitude: "0.00", description: "Une joli description des Beaux Arts", score: 10000)
beaux_arts.city = lille
beaux_arts.save

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
city1 = City.new(name: "Orléans")
city1.save
city2 = City.new(name: "Lille")
city2.save
city3 = City.new(name: "Paris")
city3.save
city4 = City.new(name: "Combleux")
city4.save
city5 = City.new(name: "Olivet")
city5.save
city6 = City.new(name: "Roubaix")
city6.save

