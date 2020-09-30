process.env.NODE_ENV = 'test';
 
var Vehicle = require('../src/controllers/VehiclesController');
 
//Aqui estamos declarando as dependências necessárias para realizar os nossos testes!
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server');
var should = chai.should();
 
chai.use(chaiHttp);
 
//Aqui é o bloco principal que executará o nossos testes:
describe('Veículos', function() {
    beforeEach(function(done) {
 
        //Sempre depois de executar o nosso teste, iremos limpar a nossa base de dados:
        Vehicle.remove({}, function(error: any) {
            done();
        });
    });
 
    describe('/GET vehicle', function() {
        it('Deve retornar todos os veículos', function(done) {
            chai.request(server)
            .get('/vehicles')
            .end(function(error: any, res: any) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
            done();
            });
        });
    });

    describe('/POST vehicles', function() {
        it('Não deve retornar o POST do veículo criado, uma vez que não foi definido o campo: board', function(done) {
     
            //Aqui simulamos a criação de um veículo, porém sem definir a placa do veículo:
            var vehicle = {
                chassi: "70Awtnft3tVfZ7866",
                renavam: "89855560209",
                model: "Trafic Passageiros 2.1 Diesel",
                brand: "GM - Chevrolet",
                year: "1994"
            }
            chai.request(server)
            .post('/vehicles')
            .send(vehicle)
            .end(function(error: any, res:any) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('board');
                res.body.errors.board.should.have.property('kind').eql('required');
                done();
            });
        });    

        it('Deve Criar um Veículo', function(done) {
            var vehicle = {
                board: "AAA1234",
                chassi: "70Awtnft3tVfZ7866",
                renavam: "89855560209",
                model: "Trafic Passageiros 2.1 Diesel",
                brand: "GM - Chevrolet",
                year: "1994"
            }
            chai.request(server)
            .post('/vehicles')
            .send(vehicle)
            .end(function(error: any, res: any) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Veículo adicionado com Sucesso!');
                res.body.vehicle.should.have.property('board');
                res.body.vehicle.should.have.property('chassi');
                res.body.vehicle.should.have.property('renavam');
                res.body.vehicle.should.have.property('model');
                res.body.vehicle.should.have.property('brand');
                res.body.vehicle.should.have.property('year');
            done();
            });
        });
    })

    describe('/GET/:id vehicles', function() {
        it('Deve retornar um veículo dado o id', function() {
            var vehicle = new Vehicle( {
                id: '5',
                board: "AAA1234",
                chassi: "70Awtnft3tVfZ7866",
                renavam: "89855560209",
                model: "Trafic Passageiros 2.1 Diesel",
                brand: "GM - Chevrolet",
                year: "1994"
            });
            vehicle.save(function(error: any, vehicle: any) {
                chai.request(server)
                .get('/vehicles/' + vehicle.id)
                .send(vehicle)
                .end(function(error: any, res: any) {
                   res.should.be.a('object');
                   res.body.should.have.property('board');
                   res.body.should.have.property('chassi');
                   res.body.should.have.property('renavam');
                   res.body.should.have.property('model');
                   res.body.should.have.property('brand');
                   res.body.should.have.property('year');
                   res.body.should.have.property('_id').eql(vehicle.id);
                });
            });
        });
    });


    describe('/PUT/:id vehicles', function(){
        it('Deve atualizar um veículo dado o id', function(done){
          var vehicle = new Vehicle({ board: "AAA1234", chassi: "70Awtnft3tVfZ7866", renavam: "89855560209", model: "Trafic Passageiros 2.1 Diesel", brand: "GM - Chevrolet", year: "1994"})
          vehicle.save(function(error: any, Vehicle: any){
                  chai.request(server)
                  .put('/vehicles/' + Vehicle.id)
                  .send({ board: "AAB1234", chassi: "70Awsdsfst3tVfZ7866", renavam: "82545560209", model: "Trafic", brand: "Chevrolet", year: "2000"})
                  .end(function(error: any, res: any){
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('Veículo Atualizado com Sucesso');
                      res.body.vehicle.should.have.property('year').eql("2000");
                  done();
              });
          });
      });
    });

    describe('/DELETE/:id vehicles', function(){
        it('Deve excluir um veículo dado o id', function(done){
          var vehicle = new Vehicle({ board: "AAA1234", chassi: "70Awtnft3tVfZ7866", renavam: "89855560209", model: "Trafic Passageiros 2.1 Diesel", brand: "GM - Chevrolet", year: "1994"})
          vehicle.save(function(error: any, vehicle: any){
                  chai.request(server)
                  .delete('/vehicles/' + vehicle.id)
                  .end(function(error: any, res: any){
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('Veículo excluído com Sucesso!');
                    done();
              });
          });
      });
    });

})