object :@itineraire
attributes :id
child(:@monuments) { attributes :id, :name, :address, :latitude, :longitude, :photo, :description, :score }
