Rails.application.routes.draw do

  devise_for :users

  # Vue de composant
  get "/components", to: 'cities#components', as: :components

  #racine de l'app
  root to: 'cities#home', as: :root

  post '/search', to: 'cities#search', as: :search_city # redirection avec l'id

  get '/explications/:name', to: 'cities#explications', as: :explications # Avec id de la ville

  post '/city/:city_id', to: 'itineraires#search', as: :post_city # Crée l'itinéraire avec l'id de la ville --> redirige avec id itinéraire

  get '/vos-monuments/:id', to: 'itineraires#choice', as: :choice
  # permet d'ajouter avec AJAX un monument à un itinéraire
  post '/vos-monuments/:id/:monument_id', to: 'itineraires#ajout', as: :ajout
  delete '/vos-monuments/delete/:id/:monument_id', to: 'itineraires#delete', as: :delete

  #affichage du recap
  get '/synthese/:id', to: 'itineraires#recap', as: :recap # avec id itinéraire
  #delete avec AJAX d'un monument à un itinéraire
  post '/synthese/:id/:monument_id', to: 'itineraires#supprimer', as: :supprimer

  #affichage de l'itinéraire
  get '/itineraire/:id', to: 'itineraires#show', as: :itinary # avec id itinéraire

  post 'itineraires/:id', to: 'itineraires#metrics', as: :metrics # Enregistrement des metrics de l'itinéraire

  get '/vos-itineraires', to: 'itineraires#display', as: :display #affichage des itinéraires précedent de l'utilisateur
#page mes itinéraires (par villes)

end
