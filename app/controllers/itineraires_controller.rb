class ItinerairesController < ApplicationController
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
    @monuments = Monument.where.not(id: @itineraire.monuments.pluck(:id)).order(score: :desc)
    # Set the compteur to 0
    @itineraire.update(compteur: 0)
    # Make accessible to JS everything define in choice.json.rabl (in views)
    gon.rabl
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

  def recap
    @itineraire = Itineraire.find(params[:id])
    #@selected = Monument
    @selected = ["treille", "quai du wault", "beaux arts"]

  end

  def show

  end
end

