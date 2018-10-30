object :@itineraire
attributes :id, :compteur
child(:@monuments) { attributes :id, :name, :address, :latitude, :longitude, :photo, :description, :score }
