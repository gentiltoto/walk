module ApplicationHelper
  def score_to_stars(score)
    case score.to_i
    when 200 .. 1000
      return 5
    when 150 .. 200
      return 4.5
    when 100 .. 150
      return 4.0
    when 75 .. 100
      return 3.5
    when 50 .. 75
      return 3
    when 25 .. 50
      return 2.5
    else
      return 2
    end
  end
end
