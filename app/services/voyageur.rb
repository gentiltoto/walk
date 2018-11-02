class Voyageur

  def initialize(latitudes, longitudes)
    @miniter = 20
    @x = latitudes
    @y = longitudes
  end

  def call
    ordre = (0..@x.length - 1).to_a
    ordre = n_permutation(@x, @y, @miniter)

    xo = []
    yo = []
    for o in ordre +[ordre[0]]
      xo << @x[o]
      yo << @y[o]
    end

    return { latitudes: xo, longitudes: yo }

  end

  private

  def longueur (x,y, ordre)
      i = ordre[-1]
      x0 = x[i]
      y0 = y[i]
      d = 0
      for o in ordre
          x1 = x[o]
          y1 = y[o]
          d += (x0 - x1)**2 + (y0 - y1)**2
          x0 = x1
          y0 = y1
      end
      return d
  end

  def permutation_rnd(x,y,ordre,miniter)
      d  = longueur(x,y,ordre)
      d0 = d+1
      it = 1
      while d < d0 or it < miniter
          it += 1
          d0 = d
          for i in 1...(ordre.length-1)
              for j in i+2...(ordre.length + 1)
                  k = rand(1..(ordre.length-1))
                  l = rand(k+1..ordre.length)
                  r = Array(ordre[k...l])
                  r = r.reverse
                  ordre2 = ordre[0...k] + r + ordre[l..-1]
                  t = longueur(x,y,ordre2)
                  if t < d
                      d = t
                      ordre = ordre2
                  end
              end
          end
      end
    return ordre
  end

  def n_permutation(x,y, miniter)
      ordre = (0...(x.length)).to_a
      bordre = Array(ordre)
      d0 = longueur(x,y,ordre)
      for i in (0...@miniter)
          puts("iteration",i, "d=",d0)
          ordre = ordre.shuffle
          ordre = permutation_rnd(x, y,ordre, @miniter)
          d = longueur(x,y,ordre)
          if d < d0
              d0 = d
              bordre = Array(ordre)
          end
      end
      return bordre
  end
end
