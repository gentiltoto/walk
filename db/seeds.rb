lille = City.new(name: "Lille")
lille.save

rihour = Monument.new(name: "Place Rihour", address: "Place Rihour", latitude: "0.00", longitude: "0.00", description: "Une joli description de rihour", score: 1000)
rihour.city = lille
rihour.save

grand_place = Monument.new(name: "Grand Place", address: "Grand Place", latitude: "0.00", longitude: "0.00", description: "Une joli description de grand place", score: 10000)
grand_place.city = lille
grand_place.save
