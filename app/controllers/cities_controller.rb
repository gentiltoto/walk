class CitiesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :components]

  def components
  end

  def home
    @city = City.new
    @cities = City.all
    gon.rabl
  end

  def search
    fail
    redirect_to explications_path(params[:id])
  end

  def explications
    # Sélectionne la ville pour pouvoir afficher son nom
    @city = City.find(params[:id])
  end
end
