class ItinerairesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:ajout]

  def search
    @city = City.find(params[:city_id])
    @itineraire = Itineraire.new(name: @city.name) # Ajout de city au modèle (ou through)
    @itineraire.city = @city
    @itineraire.user = current_user
    @itineraire.save
    redirect_to choice_path(@itineraire)
  end

  def choice
    @itineraire = Itineraire.find(params[:id])
    # pluck send a array of id
    @monuments = Monument.where(city: @itineraire.city).where.not(id: @itineraire.monuments.pluck(:id)).order(score: :desc)
    # Set the compteur to 0
    @itineraire.update(compteur: 0)
    # Make accessible to JS everything define in choice.json.rabl (in views)
    gon.itineraire = @itineraire
    gon.itineraireMonuments = @itineraire.monuments
    gon.monuments = @monuments
  end

  def ajout
    # Find the itineraire
    @itineraire = Itineraire.find(params[:id])
    # Find the monument
    @monument = Monument.find(params[:monument_id])
    # Add the monument to the itineraire
    @itineraire.monuments.push(@monument)
    # Set the compteur to the next index of the added monuments
    @itineraire.update(compteur: params["compteur"].to_i + 1)
    redirect_to choice_path(@itineraire)
  end

  def delete
    # Find the itineraire
    @itineraire = Itineraire.find(params[:id])
    # # Find the monument
    @monument = Monument.find(params[:monument_id])

    @itineraire.monuments.delete(@monument)
  end

  def recap
    @itineraire = Itineraire.find(params[:id])
    #récupérer les monuments selectionnés

    @monuments = @itineraire.monuments
    #make accessible to JS what is done in recap
    gon.monuments = @monuments
    gon.itineraire = @itineraire
  end

  # A ENLEVER
  def supprimer
    # Find the itineraire
    @itineraire = Itineraire.find(params[:id])
    # Find the monument to delete
    @monument = Monument.find(params[:monument_id])
    #delete the monument of the itinary
    @itineraire.monuments.destroy(@monument)

    #permet à la vue de gérer si l'utilisateur utilise JS ou pas
    respond_to do |format|
      format.html { redirect_to recap_path(@itineraire) }
      format.js # will render 'app/views/itineraries/supprimer.js.erb'
    end
  end

  def show
    @itineraire = Itineraire.find(params[:id])
    @monuments = @itineraire.monuments
    coord_initial = compute_array(@monuments)
    x = []
    coord_initial.each { |e| x.push(e[0].to_f) }
    y = []
    coord_initial.each { |e| y.push(e[1].to_f) }
    @coord = Voyageur.new(y, x).call
    @coord = transform(@coord)

    # Logique Point de Départ

    # Si il n'y en a pas cela ne change rien
    if @itineraire.point_depart == ""
      #coord ordonnée par le service objet
      gon.coordonees = @coord

    # Sinon ajoute pour la route seulement les coordonées
    else
      pt_depart = to_hash_point_depart(@itineraire.point_depart)
      tmp = @coord
      tmp.pop
      tmp.unshift([pt_depart[:lng], pt_depart[:lat]])
      tmp.push([pt_depart[:lng], pt_depart[:lat]])
      gon.coordonees = tmp
    end

    gon.itineraire = @itineraire
    gon.monuments = @monuments #monuments NON ordonnées
    gon.idsOrdonee = refind(@coord, @monuments).map {|monument| monument[0][:id]} #Array des ID des monuments ordonénes par le service object
    gon.monumentsOrdonne = refind(@coord, @monuments)
    gon.itineraire = @itineraire#Array des monuments ordonnées par le service objet.
  end

  def display #affiche l'itinéraire final d'un ancien trajet
    @itineraires_perso = Itineraire.where(user_id: current_user.id).select { |itineraire| itineraire.monuments.size != 0 }
  end

  def metrics
    @itineraire = Itineraire.find(params[:id])
    @itineraire.update(duration: params["duration"])
    @itineraire.update(distance: params["distance"])
  end

  def geocode
    Geocoder.configure(lookup: :opencagedata, api_key: ENV["OPEN_CAGE"])
    results = Geocoder.search(params[:query])
    render json: { results: results }
  end

  private

  def compute_array(monuments)
    arr = []
    monuments.each { |monument| arr.push([monument.latitude, monument.longitude]) }
    return arr
  end

  def transform(coord)
    arr_final = []
    coord[:latitudes].size.times { |i| arr_final.push([coord[:latitudes][i], coord[:longitudes][i]]) }
    return arr_final
  end

  def refind(coords, monuments)
    arr = []
    coords.each_with_index do |coord, index|
      if index != coords.size - 1
        selec = monuments.select { |monument| monument[:longitude] == coord[0].to_s && monument[:latitude] == coord[1].to_s }
        arr.push(selec)
      end
    end
    return arr
  end

  def to_hash_point_depart(string)
    return {
      lng: test.match(/lng=(\d+\.\d+)/)[1].to_f,
      lat: test.match(/lat=(\d+\.\d+)/)[1].to_f,
      address: test.match(/address=(.+)/)[1]
    }
  end
end
