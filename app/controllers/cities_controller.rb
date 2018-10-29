class CitiesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :components]

  def components
  end

  def home
    # @cities = City.all
    @cities = ["Lille", "Lille", "Lille", "Lille"] # Provisoire
  end

  def search
    redirect_to explications_path(params[:id])
  end

  def explications
    # Sélectionne la ville pour pouvoir afficher son nom
    # @city = City.find(params[:id])
    @city = { city_id: 1 } # FAKE
  end
end
