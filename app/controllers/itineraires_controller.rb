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
    @monuments = Monument.where(city: @itineraire.city.name)
  end

  def recap
    # @itineraire = Itineraire.find(params[:id])
    @itineraire = 1
  end

  def show

  end
end
