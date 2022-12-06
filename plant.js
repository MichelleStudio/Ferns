class Plant{
  constructor(l, dna_) {
    this.position = l.copy(); // Location
    this.health = 200; // Life timer
    this.dna = dna_; // DNA
    
    // DNA will determine 
    this.species = parseInt(random(3)); 
    this.width = map(this.dna.genes[1], 0, 1, 100, 200);
    this.height = map(this.dna.genes[2], 0, 1, 100, 200);
    this.rotation = map(this.dna.genes[3], 0, 1, 0, 2*PI);
  }

  evolve(environ=1000) {
    this.health -= 1 + environ/1000;
    this.width += 0.1 + environ/10000;
    this.height += 0.1 + environ/10000; 
  }

  reproduce(environ=1000) {
    // asexual reproduction
    //random(number), bigger, slower
    if (random(7) < environ/10000) {
      // Child is exact copy of single parent
      let childDNA = this.dna.copy();
      // Child DNA can mutate
      childDNA.mutate(0.01);
      let newPosition =  createVector(random(width),random(height));
      return new Plant(newPosition, childDNA);
    } else {
      return null;
    }
  }

  display() {
    if (!this.dead()) {
      push();
      rotate(this.rotation);
      image(ferns[this.species], this.position.x, this.position.y, this.width, this.height);
      pop();
    }
  }

  dead() {
    if (this.health < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}