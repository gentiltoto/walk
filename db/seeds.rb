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
