class CitiesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :components]

  def components
  end

  def home
  end

  def search
    redirect_to explications_path(params[:id])
  end

  def explications
  end
end
