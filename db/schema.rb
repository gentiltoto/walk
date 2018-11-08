# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_11_08_094801) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cities", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "photo"
    t.string "latitude"
    t.string "longitude"
  end

  create_table "intermediaires", force: :cascade do |t|
    t.bigint "itineraire_id"
    t.bigint "monument_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["itineraire_id"], name: "index_intermediaires_on_itineraire_id"
    t.index ["monument_id"], name: "index_intermediaires_on_monument_id"
  end

  create_table "itineraires", force: :cascade do |t|
    t.string "geojson"
    t.bigint "user_id"
    t.string "name"
    t.string "distance"
    t.string "parcours"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "city_id"
    t.integer "compteur", default: 0
    t.string "duration"
    t.index ["city_id"], name: "index_itineraires_on_city_id"
    t.index ["user_id"], name: "index_itineraires_on_user_id"
  end

  create_table "monuments", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.string "latitude"
    t.string "longitude"
    t.string "photo"
    t.bigint "city_id"
    t.string "description"
    t.string "score"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "protection"
    t.index ["city_id"], name: "index_monuments_on_city_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "intermediaires", "itineraires"
  add_foreign_key "intermediaires", "monuments"
  add_foreign_key "itineraires", "cities"
  add_foreign_key "itineraires", "users"
  add_foreign_key "monuments", "cities"
end
